import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Cpu,
  X,
  Play,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Layers,
  BarChart2,
  RefreshCw,
} from 'lucide-react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { COLORS } from '../../utils/theme';
import { triggerHaptic } from '../../utils/haptics';
import {
  BenchmarkResult,
  EngineDiagnosticsReport,
  ProgrammingDiagnostics,
} from '../../services/programming/diagnostics';
import { ProgrammingEngine } from '../../services/programming/programmingEngine';
import { QuestionRepository } from '../../repositories/questionRepository';
import { GeneratedProgrammingQuestion } from '../../services/programming/types';

interface ProgrammingAdminModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProgrammingAdminModal: React.FC<ProgrammingAdminModalProps> = ({
  visible,
  onClose,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<EngineDiagnosticsReport | null>(null);
  const [benchmarkResult, setBenchmarkResult] = useState<BenchmarkResult | null>(null);
  const [geminiCandidate, setGeminiCandidate] = useState<GeneratedProgrammingQuestion | null>(null);
  const [geminiLoading, setGeminiLoading] = useState(false);

  const loadReport = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ProgrammingDiagnostics.getDiagnostics();
      setReport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      loadReport();
    }
  }, [visible, loadReport]);

  const handleRunBenchmark = async () => {
    triggerHaptic.selection();
    setLoading(true);
    try {
      const res = await ProgrammingDiagnostics.runBenchmark(50);
      setBenchmarkResult(res);
      triggerHaptic.success();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '오류 발생';
      Alert.alert('벤치마크 실패', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleTestGeminiGenerate = async () => {
    triggerHaptic.selection();
    setGeminiLoading(true);
    try {
      const res = await ProgrammingEngine.generateWithGeminiFallback({
        language: 'C',
        topic: 'POINTER_REFERENCE',
        difficulty: 'MEDIUM',
      });

      setGeminiCandidate(res.question);
      triggerHaptic.success();
      if (res.source === 'local_fallback') {
        Alert.alert(
          '로컬 폴백 작동 알림',
          `Gemini 연결 불가 또는 오류로 인해 로컬 조합식 생성기로 안전 대체되었습니다.\n(사유: ${res.error || '네트워크/API키 미설정'})`,
        );
      } else {
        Alert.alert(
          'Gemini 후보 생성 성공!',
          `검증 상태: ${res.question.validationStatus}\n지문: ${res.question.structuralFingerprint}`,
        );
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '생성 실패';
      Alert.alert('생성 실패', msg);
    } finally {
      setGeminiLoading(false);
    }
  };

  const handleSaveGeminiCandidate = async () => {
    if (!geminiCandidate) return;

    if (geminiCandidate.validationStatus === 'rejected') {
      Alert.alert('저장 불가', '자동 검증을 통과하지 못한 문제(rejected)는 문제은행에 저장할 수 없습니다.');
      return;
    }

    if (geminiCandidate.validationStatus === 'manualReviewRequired') {
      Alert.alert(
        '수동 검토 승인 필요',
        '해설과 정답의 논리적 일치성을 검토하셨습니까? 승인 후 문제은행에 저장하시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '승인 및 저장',
            onPress: async () => {
              const approved = {
                ...geminiCandidate,
                validationStatus: 'validated' as const,
              };
              const count = await QuestionRepository.appendCachedQuestions([approved]);
              if (count > 0) {
                triggerHaptic.success();
                Alert.alert('저장 완료', '문제은행(로컬 캐시)에 정식 추가되었습니다.');
                setGeminiCandidate(null);
                await loadReport();
              } else {
                Alert.alert('알림', '이미 존재하는 문제이거나 추가되지 않았습니다.');
              }
            },
          },
        ],
      );
      return;
    }

    triggerHaptic.selection();
    const count = await QuestionRepository.appendCachedQuestions([geminiCandidate]);
    if (count > 0) {
      triggerHaptic.success();
      Alert.alert('저장 완료', '문제은행(로컬 캐시)에 정식 추가되었습니다.');
      setGeminiCandidate(null);
      await loadReport();
    } else {
      Alert.alert('알림', '이미 존재하는 문제이거나 추가되지 않았습니다.');
    }
  };


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={[styles.modalContainer, { backgroundColor: theme.surface }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <View style={styles.headerLeft}>
              <View style={[styles.iconBox, { backgroundColor: theme.primaryLight }]}>
                <Cpu size={20} color={theme.primary} />
              </View>
              <View>
                <Text style={[styles.title, { color: theme.text }]}>
                  문제 생성 엔진 진단 및 관리
                </Text>
                <Text style={[styles.subtitle, { color: theme.subText }]}>
                  독립 생성기 10종 및 다양성/중복률 모니터링
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <X size={22} color={theme.mutedText} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView contentContainerStyle={styles.content}>
            {loading && !report ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={{ color: theme.subText, marginTop: 12 }}>
                  엔진 상태 진단 중...
                </Text>
              </View>
            ) : (
              <>
                {/* Status KPI Cards */}
                {report && (
                  <View style={styles.kpiRow}>
                    <View
                      style={[
                        styles.kpiCard,
                        { backgroundColor: theme.surfaceSecondary, borderColor: theme.border },
                      ]}
                    >
                      <Text style={[styles.kpiLabel, { color: theme.subText }]}>
                        등록 생성기
                      </Text>
                      <Text style={[styles.kpiValue, { color: theme.primary }]}>
                        {report.registeredGeneratorsCount}종
                      </Text>
                      <Text style={[styles.kpiSub, { color: theme.subText }]}>
                        독립 모듈형
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.kpiCard,
                        { backgroundColor: theme.surfaceSecondary, borderColor: theme.border },
                      ]}
                    >
                      <Text style={[styles.kpiLabel, { color: theme.subText }]}>
                        보유 프로그래밍
                      </Text>
                      <Text style={[styles.kpiValue, { color: theme.text }]}>
                        {report.totalProgrammingQuestions}문제
                      </Text>
                      <Text style={[styles.kpiSub, { color: theme.subText }]}>
                        고유지문 {report.uniqueFingerprintsCount}개
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.kpiCard,
                        { backgroundColor: theme.surfaceSecondary, borderColor: theme.border },
                      ]}
                    >
                      <Text style={[styles.kpiLabel, { color: theme.subText }]}>
                        구조 중복률
                      </Text>
                      <Text
                        style={[
                          styles.kpiValue,
                          {
                            color:
                              report.duplicateRatePercent > 30
                                ? theme.wrong
                                : theme.correct,
                          },
                        ]}
                      >
                        {report.duplicateRatePercent}%
                      </Text>
                      <Text style={[styles.kpiSub, { color: theme.subText }]}>
                        지문 유사도 기준
                      </Text>
                    </View>
                  </View>
                )}

                {/* Generator List */}
                {report && (
                  <View
                    style={[
                      styles.sectionCard,
                      { backgroundColor: theme.surfaceSecondary, borderColor: theme.border },
                    ]}
                  >
                    <View style={styles.sectionHeaderRow}>
                      <Layers size={16} color={theme.primary} />
                      <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        등록된 독립 문제 생성기 ({report.generatorNames.length}개)
                      </Text>
                    </View>
                    <View style={styles.tagWrap}>
                      {report.generatorNames.map((name) => (
                        <View
                          key={name}
                          style={[
                            styles.genTag,
                            { backgroundColor: theme.surface, borderColor: theme.border },
                          ]}
                        >
                          <Text style={[styles.genTagText, { color: theme.text }]}>
                            {name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* Actions: Benchmark & Gemini */}
                <View style={styles.btnRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: theme.primary }]}
                    onPress={handleRunBenchmark}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Play size={16} color="#FFFFFF" />
                    <Text style={styles.actionBtnText}>
                      다양성 벤치마크 (50회)
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      { backgroundColor: theme.accent, marginLeft: 8 },
                    ]}
                    onPress={handleTestGeminiGenerate}
                    disabled={geminiLoading}
                    activeOpacity={0.8}
                  >
                    {geminiLoading ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <>
                        <Sparkles size={16} color="#FFFFFF" />
                        <Text style={styles.actionBtnText}>
                          Gemini 후보 테스트
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                {/* Benchmark Result Box */}
                {benchmarkResult && (
                  <View
                    style={[
                      styles.sectionCard,
                      { backgroundColor: theme.surfaceSecondary, borderColor: theme.border },
                    ]}
                  >
                    <View style={styles.sectionHeaderRow}>
                      <BarChart2 size={16} color={theme.correct} />
                      <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        벤치마크 결과 ({benchmarkResult.elapsedTimeMs}ms 소요)
                      </Text>
                    </View>

                    <Text style={[styles.benchmarkSummary, { color: theme.text }]}>
                      50회 연속 생성 중 고유 구조 지문:{' '}
                      <Text style={{ color: theme.primary, fontWeight: '700' }}>
                        {benchmarkResult.uniqueFingerprints}개 (고유율 {benchmarkResult.uniqueRatePercent}%)
                      </Text>
                    </Text>

                    <Text style={[styles.subHeading, { color: theme.subText, marginTop: 8 }]}>
                      언어 분포: C({benchmarkResult.languageDistribution['C'] || 0}), Java({benchmarkResult.languageDistribution['JAVA'] || 0}), Python({benchmarkResult.languageDistribution['PYTHON'] || 0})
                    </Text>

                    <View style={styles.distGrid}>
                      {Object.entries(benchmarkResult.topicDistribution).map(
                        ([topic, count]) => (
                          <View key={topic} style={styles.distItem}>
                            <Text style={[styles.distLabel, { color: theme.subText }]}>
                              {topic}:
                            </Text>
                            <Text style={[styles.distVal, { color: theme.text }]}>
                              {count}
                            </Text>
                          </View>
                        ),
                      )}
                    </View>
                  </View>
                )}

                {/* Gemini Candidate Preview */}
                {geminiCandidate && (
                  <View
                    style={[
                      styles.sectionCard,
                      {
                        backgroundColor: theme.surfaceSecondary,
                        borderColor:
                          geminiCandidate.validationStatus === 'validated'
                            ? theme.correct
                            : theme.border,
                      },
                    ]}
                  >
                    <View style={styles.sectionHeaderRow}>
                      <Sparkles size={16} color={theme.accent} />
                      <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        생성된 후보 문제 검토
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              geminiCandidate.validationStatus === 'validated'
                                ? theme.correctLight
                                : theme.wrongLight,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            {
                              color:
                                geminiCandidate.validationStatus === 'validated'
                                ? theme.correct
                                : theme.wrong,
                            },
                          ]}
                        >
                          {geminiCandidate.validationStatus}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.previewFp, { color: theme.subText }]}>
                      지문: {geminiCandidate.structuralFingerprint}
                    </Text>

                    <Text style={[styles.previewQuestion, { color: theme.text }]}>
                      {geminiCandidate.question}
                    </Text>

                    <View
                      style={[
                        styles.codeBox,
                        { backgroundColor: isDarkMode ? '#1E1E2E' : '#F5F5F7' },
                      ]}
                    >
                      <Text style={[styles.codeText, { color: theme.text }]}>
                        {geminiCandidate.code}
                      </Text>
                    </View>

                    <Text style={[styles.previewAnswer, { color: theme.primary }]}>
                      정답: {Array.isArray(geminiCandidate.answer) ? geminiCandidate.answer.join(', ') : geminiCandidate.answer}
                    </Text>
                    <Text style={[styles.previewExplanation, { color: theme.subText }]}>
                      해설: {geminiCandidate.explanation}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.saveBtn,
                        {
                          backgroundColor:
                            geminiCandidate.validationStatus === 'validated'
                              ? theme.primary
                              : geminiCandidate.validationStatus === 'manualReviewRequired'
                              ? theme.accent
                              : theme.mutedText,
                          opacity: geminiCandidate.validationStatus === 'rejected' ? 0.5 : 1,
                        },
                      ]}
                      onPress={handleSaveGeminiCandidate}
                      disabled={geminiCandidate.validationStatus === 'rejected'}
                    >
                      <CheckCircle size={16} color="#FFFFFF" />
                      <Text style={styles.saveBtnText}>
                        {geminiCandidate.validationStatus === 'validated'
                          ? '문제은행에 정식 저장'
                          : geminiCandidate.validationStatus === 'manualReviewRequired'
                          ? '수동 검토 승인 후 저장'
                          : '검증 미통과 (저장 불가)'}
                      </Text>
                    </TouchableOpacity>

                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '88%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    padding: 20,
  },
  loadingBox: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 4,
  },
  kpiSub: {
    fontSize: 10,
  },
  sectionCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  genTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  genTagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  btnRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  benchmarkSummary: {
    fontSize: 13,
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 12,
  },
  distGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  distItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  distLabel: {
    fontSize: 11,
    marginRight: 4,
  },
  distVal: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  previewFp: {
    fontSize: 10,
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  previewQuestion: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  codeBox: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  codeText: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  previewAnswer: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  previewExplanation: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 12,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
