# 개발 증거 운영 규칙

> 목적: 제출 직전에 꾸민 설명이 아니라, 개발 과정에서 실제로 생긴 변화·자동 검증·외부 시각을 심사위원이 짧게 추적할 수 있게 한다.

## 증거 사슬

```text
작업 단위 커밋
  → GitHub push (외부 기록 시각)
  → GitHub Actions 검증 리포트 (커밋 SHA + UTC 시각)
  → GitHub Pages 배포 (해당 커밋의 실행 가능한 화면)
  → DEVLOG의 판단 기록 (커밋 SHA 링크)
```

GitHub 커밋의 작성 시각만으로는 충분하지 않다. 따라서 **매 작업일의 마지막 커밋은 그날 바로 push**하고, Actions 실행·Pages 배포 기록과 연결한다.

## 매 작업일 5분 루틴

1. `DEVLOG.md`에 Codex 요청, 결과, 막힌 점, 사람이 내린 판단을 4줄 이내로 적는다.
2. 하나의 플레이 가능한 변화 또는 명확한 문서 변화만 한 커밋에 넣는다.
3. 커밋 메시지는 결과 중심으로 쓴다. 예: `feat: limit each boss phase to three shots`.
4. 같은 날 GitHub에 push한다. amend, rebase, force-push는 증거 브랜치에서 사용하지 않는다.
5. GitHub Actions의 **Evidence report**와 **Deploy to GitHub Pages**가 성공한 것을 확인한다.
6. 중요한 방향 전환일에는 20~40초짜리 화면 녹화를 `evidence/captures/`에 추가한다. 화면에는 Codex 요청의 짧은 일부, 실제 플레이, 해당 커밋 또는 Pages 화면이 함께 보이면 충분하다.

## Actions가 자동으로 남기는 것

`scripts/verify-evidence.mjs`가 아래를 검사하고 `verification.json`을 artifact로 업로드한다.

- 공백/충돌 마커 검사 (`git diff --check`)
- 현재 메인 데모 파일의 존재
- 파티 편성·발사·핵심 캐릭터 능력 등 프로토타입 기능 표식
- 검사한 파일의 SHA-256
- GitHub가 제공한 commit SHA, run ID, UTC 시각

artifact는 GitHub의 실행 기록에 귀속되며, 로컬 `DEVLOG.md`만 단독으로 수정한 것보다 강한 보조 증거다.

## 중요한 주의점

- 이 체인은 개발 과정을 **신뢰성 있게 보여 주는 실무적 증거**이지, 누가 모든 줄을 직접 썼는지 암호학적으로 증명하는 장치는 아니다.
- 전체 Codex 대화 전문을 공개하지 않는다. 길고 사적인 정보가 섞일 수 있다. 대신 핵심 프롬프트/결정 한두 줄과 실제 결과물을 연결한다.
- 커밋 서명(Verified)은 가능하면 사용하되 필수로 만들지 않는다. 서명 키 설정이 불완전한 상태에서 작업을 막지 않는다.
- API 키, 계정 토큰, 개인 연락처, 비공개 대화는 절대 커밋하지 않는다.

## 제출 직전 심사위원용 링크

제출 문안 또는 영상 설명란에 아래 링크를 둔다.

- 게임: GitHub Pages의 `/prototypes/prism-breakers.html`
- 제작 과정: `CODEX_COLLABORATION.md`
- 결정 기록: `DEVLOG.md`
- 자동 검증: 최근 GitHub Actions의 Evidence report 실행 링크

## 상태

- [x] 증거 운영 문서
- [x] GitHub Actions 검증 워크플로
- [x] GitHub Pages 배포 워크플로
- [x] 첫 공개 원격 push — [`76a8a3d`](https://github.com/8rulerstar/prism-breakers/commit/76a8a3da7f6c9f80d8edfb944e8f15804048c5fe), 2026-08-07
- [x] 첫 Actions artifact 성공 — [Evidence report](https://github.com/8rulerstar/prism-breakers/actions/runs/31156765698), 2026-08-07 07:12 UTC
- [x] 첫 Pages 배포 성공 — [Deploy to GitHub Pages](https://github.com/8rulerstar/prism-breakers/actions/runs/31156820634), 2026-08-07 07:13 UTC
- [ ] 작업일별 기록 유지
