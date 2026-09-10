import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Bookmark as BookmarkIcon, Play, RefreshCw, Layers } from 'lucide-react-native';
import { useSettingsStore } from '../store/settingsStore';
import { AttemptRepository, WrongQuestionSummary } from '../repositories/attemptRepository';
import { BookmarkRepository } from '../repositories/bookmarkRepository';
import { QuestionRepository } from '../repositories/questionRepository';
import { Question } from '../types/question';
import { triggerHaptic } from '../utils/haptics';
import { COLORS } from '../utils/theme';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

type FilterType = 'ALL' | 'RECENT' | 'MOST_WRONG' | 'UNKNOWN' | 'BOOKMARK';

interface WrongNoteScreenProps {
  onStartQuiz: (questions: Question[], title: string) => void;
}

export const WrongNoteScreen: React.FC<WrongNoteScreenProps> = ({ onStartQuiz }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [summaries, setSummaries] = useState<WrongQuestionSummary[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [displayQuestions, setDisplayQuestions] = useState<Question[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const rawSummaries = await AttemptRepository.getWrongQuestionSummaries();
    const bIds = await BookmarkRepository.getBookmarkedQuestionIds();
    setSummaries(rawSummaries);
    setBookmarkedIds(bIds);

    // 필터별 문제 목록 정렬 및 추출
    let targetIds: string[] = [];

    if (activeFilter === 'BOOKMARK') {
      targetIds = bIds;
    } else if (activeFilter === 'RECENT') {
      targetIds = rawSummaries
        .filter((s) => s.lastAttemptIsWrong)
        .sort((a, b) => new Date(b.lastAnsweredAt).getTime() - new Date(a.lastAnsweredAt).getTime())
        .map((s) => s.questionId);
    } else if (activeFilter === 'MOST_WRONG') {
      targetIds = [...rawSummaries]
        .sort((a, b) => b.wrongAttempts + b.unknownAttempts - (a.wrongAttempts + a.unknownAttempts))
        .map((s) => s.questionId);
    } else if (activeFilter === 'UNKNOWN') {
      targetIds = rawSummaries
        .filter((s) => s.unknownAttempts > 0)
        .sort((a, b) => b.unknownAttempts - a.unknownAttempts)
        .map((s) => s.questionId);
    } else {
      // 'ALL'
      targetIds = rawSummaries.map((s) => s.questionId);
    }

    const questions = QuestionRepository.getByIds(targetIds);
    setDisplayQuestions(questions);
  }, [activeFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleToggleBookmark = async (qId: string) => {
    triggerHaptic.selection();
    await BookmarkRepository.toggle(qId);
    await loadData();
  };

  // 전체 다시 풀기
  const handleRetryAll = () => {
    if (displayQuestions.length === 0) return;
    const filterTitle =
      activeFilter === 'BOOKMARK'
        ? '북마크 복습 풀이'
        : activeFilter === 'RECENT'
        ? '최근 오답 복습'
        : activeFilter === 'MOST_WRONG'
        ? '고난도 오답 복습'
        : activeFilter === 'UNKNOWN'
        ? '모름 문제 복습'
        : '오답노트 복습';
    onStartQuiz(displayQuestions, filterTitle);
  };

  // 단일 문제 풀기
  const handleSolveSingle = (question: Question) => {
    onStartQuiz([question], '오답 1문제 복습');
  };

  const filterTabs: { id: FilterType; label: string }[] = [
    { id: 'ALL', label: '전체' },
    { id: 'RECENT', label: '최근' },
    { id: 'MOST_WRONG', label: '많이 틀림' },
    { id: 'UNKNOWN', label: '모름' },
    { id: 'BOOKMARK', label: '북마크' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="오답노트 & 북마크" />

      {/* 필터 탭 바 */}
      <View style={[styles.filterBar, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => {
                triggerHaptic.selection();
                setActiveFilter(tab.id);
              }}
              style={[
                styles.filterTab,
                isActive && { borderBottomColor: theme.primary, borderBottomWidth: 2 },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: isActive ? theme.primary : theme.subText,
                    fontWeight: isActive ? '800' : '500',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 목록 헤더 및 재풀이 액션 바 */}
      <View style={styles.actionHeader}>
        <Text style={[styles.countText, { color: theme.subText }]}>
          총 <Text style={{ color: theme.primary, fontWeight: '700' }}>{displayQuestions.length}</Text>개 문제
        </Text>
        {displayQuestions.length > 0 && (
          <Button
            title="이 목록 다시 풀기"
            variant="primary"
            onPress={handleRetryAll}
            style={styles.retryButton}
            textStyle={{ fontSize: 13 }}
            icon={<RefreshCw size={14} color="#FFFFFF" />}
          />
        )}
      </View>

      {/* 오답/북마크 문제 리스트 */}
      <FlatList
        data={displayQuestions}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Layers size={48} color={theme.mutedText} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>등록된 문제가 없습니다</Text>
            <Text style={[styles.emptySub, { color: theme.subText }]}>
              {activeFilter === 'BOOKMARK'
                ? '문제 풀이 중 북마크 아이콘을 누르면 이곳에 모아집니다.'
                : activeFilter === 'UNKNOWN'
                ? '모른다를 누른 문제가 여기에 모입니다. 단원 개념부터 다시 보면 좋아요.'
                : '헷갈려서 틀린 문제와 몰라서 넘긴 문제가 따로 기록됩니다.'}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const summary = summaries.find((s) => s.questionId === item.id);
          const isBm = bookmarkedIds.includes(item.id);

          return (
            <Card style={styles.itemCard}>
              <View style={styles.itemTopRow}>
                <View style={styles.tagWrap}>
                  <Badge label={item.subject} variant="primary" />
                  <View style={{ width: 6 }} />
                  <Badge label={item.category} variant="default" />
                  {summary?.lastMissType === 'UNKNOWN' && (
                    <>
                      <View style={{ width: 6 }} />
                      <Badge label="모름" variant="accent" />
                    </>
                  )}
                  {summary?.lastMissType === 'WRONG' && (
                    <>
                      <View style={{ width: 6 }} />
                      <Badge label="헷갈림" variant="danger" />
                    </>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => handleToggleBookmark(item.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <BookmarkIcon
                    size={22}
                    color={isBm ? '#F59E0B' : theme.mutedText}
                    fill={isBm ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              </View>

              <Text style={[styles.questionText, { color: theme.text }]} numberOfLines={2}>
                {item.question}
              </Text>

              <View style={styles.itemBottomRow}>
                {summary && (
                  <Text style={[styles.statText, { color: theme.subText }]}>
                    <Text style={{ color: theme.wrong }}>헷갈림 {summary.wrongAttempts}회</Text>
                    {' · '}
                    <Text style={{ color: theme.accent }}>모름 {summary.unknownAttempts}회</Text>
                    {` / 총 ${summary.totalAttempts}회`}
                  </Text>
                )}
                <Button
                  title="풀어보기"
                  variant="secondary"
                  onPress={() => handleSolveSingle(item)}
                  style={styles.solveButton}
                  textStyle={{ fontSize: 13 }}
                  icon={<Play size={13} color={theme.text} />}
                />
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 12,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  countText: {
    fontSize: 14,
  },
  retryButton: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  itemCard: {
    marginVertical: 6,
    padding: 16,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 8,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 12,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    paddingTop: 10,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  solveButton: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 14,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 30,
    lineHeight: 18,
  },
});
