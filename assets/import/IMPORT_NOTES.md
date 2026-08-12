# Import Staging — Tiny Swords 선별 반입 (2026-08-10)

> Windows 작업 PC의 `D:\Assets` 팩에서 Prism Breakers에 쓸 만한 파일만 선별해 담아 둔 대기 폴더다.
> 맥에서 작업할 때 여기서 골라 쓰면 된다. 실제 게임에 반입할 때는 정식 위치(`assets/bosses`, `assets/library/...` 등)로
> 옮기거나 리컬러한 뒤 `assets/ASSET_MANIFEST.json`에 등록하고, 여기 남은 원본은 후보로 유지한다.

## 런타임 무결성 확인 — 2026-08-12

이전의 “누락 파일 7개” 안내는 제거했다. 아래 런타임 파일은 모두 Git 추적 상태이며,
`node scripts/check-portability.mjs`와 `node scripts/verify-evidence.mjs`로 함께 확인한다.

- `assets/library/boss2/void-colossus.png`
- `assets/library/anim/boss2/void-colossus-idle.png`
- `assets/library/anim/boss2/void-colossus-hit.png`
- `assets/library/boss2/void-colossus-weakgem.png`
- `assets/library/event/achievement-unlocked.png`
- `assets/library/event/achievement-locked.png`
- `assets/library/system/icon-settings.png`

이 폴더의 Tiny Swords 파일은 **후보 보관물**이다. 런타임 대체물이 필요할 때만 정식 위치로
반입하고, 그 파일을 `assets/ASSET_MANIFEST.json`에 등록한다.

## 반입 규칙 요약

- 출처: **Tiny Swords Free Pack / Enemy Pack** (Pixel Frog). 두 팩 모두 이미 `ATTRIBUTION.md`에 등록된 기존 출처이며, 관례대로 팩 전체가 아닌 선별 파일만 담았다.
- 파일명은 저장소 관례에 맞춰 kebab-case로 정규화했다. 아래 표의 `원본` 열이 팩 안의 실제 경로다.
- 애니메이션 시트는 정사각 프레임의 가로 연결이다. 표의 프레임 수 = 가로폭 ÷ 세로. UI 9-slice(바·배너 등)에는 이 값이 의미 없다.
- 렌더링 시 `imageSmoothingEnabled = false` 유지.

## 보스 후보 — `tiny-swords-enemy/`

현 보스(공허 거상)의 스프라이트 누락 대체, 또는 스테이지별 신규 보스용.
트롤은 기존 `assets/bosses/void-troll-idle.png`의 원본 소스로, 이번에는 대기 외 전체 모션을 담아
`Windup → Attack → Recovery` 패턴 연출과 처치 연출(`Dead`)까지 만들 수 있다.
미노타우르스는 위압형 근접 보스, 거북은 등껍질 방어(가드 인/아웃) 기믹 보스 후보.
기존 화풍에 맞추려면 공허 잔재처럼 보라·마젠타 계열 리컬러를 거친다.

| 파일 | 원본 | 규격 | 프레임 |
| --- | --- | --- | --- |
| `tiny-swords-enemy/troll/troll-idle.png` | Enemy Pack · `Enemies/Troll/Troll_Idle.png` | 4608x384 | 12 |
| `tiny-swords-enemy/troll/troll-windup.png` | Enemy Pack · `Enemies/Troll/Troll_Windup.png` | 1920x384 | 5 |
| `tiny-swords-enemy/troll/troll-attack.png` | Enemy Pack · `Enemies/Troll/Troll_Attack.png` | 2304x384 | 6 |
| `tiny-swords-enemy/troll/troll-recovery.png` | Enemy Pack · `Enemies/Troll/Troll_Recovery.png` | 3840x384 | 10 |
| `tiny-swords-enemy/troll/troll-dead.png` | Enemy Pack · `Enemies/Troll/Troll_Dead.png` | 3840x384 | 10 |
| `tiny-swords-enemy/minotaur/minotaur-idle.png` | Enemy Pack · `Enemies/Minotaur/Minotaur_Idle.png` | 5120x320 | 16 |
| `tiny-swords-enemy/minotaur/minotaur-walk.png` | Enemy Pack · `Enemies/Minotaur/Minotaur_Walk.png` | 2560x320 | 8 |
| `tiny-swords-enemy/minotaur/minotaur-attack.png` | Enemy Pack · `Enemies/Minotaur/Minotaur_Attack.png` | 3840x320 | 12 |
| `tiny-swords-enemy/minotaur/minotaur-guard.png` | Enemy Pack · `Enemies/Minotaur/Minotaur_Guard.png` | 3520x320 | 11 |
| `tiny-swords-enemy/turtle/turtle-idle.png` | Enemy Pack · `Enemies/Turtle/Turtle_Idle.png` | 3200x320 | 10 |
| `tiny-swords-enemy/turtle/turtle-attack.png` | Enemy Pack · `Enemies/Turtle/Turtle_Attack.png` | 3200x320 | 10 |
| `tiny-swords-enemy/turtle/turtle-guard-in.png` | Enemy Pack · `Enemies/Turtle/Turtle_Guard_In.png` | 1920x320 | 6 |
| `tiny-swords-enemy/turtle/turtle-guard-out.png` | Enemy Pack · `Enemies/Turtle/Turtle_Guard_Out.png` | 960x320 | 3 |

## 잔재·신규 적 후보 — `tiny-swords-enemy/`

스컬(검+방패 스켈레톤)은 공허 리컬러 1순위. 스파이더는 **원본부터 보라 계열**이라 현 팔레트에 거의 그대로 맞는다.
재생성 잔재, 훈련장 표적, 신규 스테이지 잡몹 후보.

| 파일 | 원본 | 규격 | 프레임 |
| --- | --- | --- | --- |
| `tiny-swords-enemy/skull/skull-idle.png` | Enemy Pack · `Enemies/Skull/Skull_Idle.png` | 1536x192 | 8 |
| `tiny-swords-enemy/skull/skull-run.png` | Enemy Pack · `Enemies/Skull/Skull_Run.png` | 1152x192 | 6 |
| `tiny-swords-enemy/skull/skull-attack.png` | Enemy Pack · `Enemies/Skull/Skull_Attack.png` | 1344x192 | 7 |
| `tiny-swords-enemy/skull/skull-guard.png` | Enemy Pack · `Enemies/Skull/Skull_Guard.png` | 1344x192 | 7 |
| `tiny-swords-enemy/spider/spider-idle.png` | Enemy Pack · `Enemies/Spider/Spider_Idle.png` | 1536x192 | 8 |
| `tiny-swords-enemy/spider/spider-run.png` | Enemy Pack · `Enemies/Spider/Spider_Run.png` | 960x192 | 5 |
| `tiny-swords-enemy/spider/spider-attack.png` | Enemy Pack · `Enemies/Spider/Spider_Attack.png` | 1536x192 | 8 |

## 적 초상 18종 — `tiny-swords-enemy/avatars/`

256×256 액자형 초상. 전투 상단 배너의 보스 얼굴, 스테이지 선택 카드, 전투 기록 화면용.
`enemy-avatar-01`(해골), `enemy-avatar-06`(검은 망령), `enemy-avatar-08`(보라 문어)이 공허 테마와 특히 잘 맞는다.
전체 목록: `enemy-avatar-01/06~16.png` + `bomb-fish`, `harpoon-shark`, `hex-shaman`, `paddle-shark`, `spear-goblin`, `torch-goblin`.

## UI — `tiny-swords-free/ui/`

| 파일 | 용도 제안 |
| --- | --- |
| `ui/icons/icon-10-gear.png` | **누락된 설정 아이콘 대체 후보** |
| `ui/icons/icon-11-info.png` | 플레이 방법·도움말 탭 |
| `ui/icons/icon-12-note.png` | 사운드 설정 행 |
| `ui/icons/icon-05-sword.png`, `icon-06-shield.png` | 업적 배지 후보 |
| `ui/icons/icon-01-hammer.png` ~ `icon-09-cross-red.png` | 기타 (망치·통나무·동전·고기·화살표 2종·엑스) |
| `ui/bars/bar-big-base.png` + `bar-big-fill.png` | 보스 체력바 스킨 (9-slice) |
| `ui/bars/bar-small-base.png` + `bar-small-fill.png` | 유닛·잔재 게이지 |
| `ui/banners/banner.png`, `banner-slots.png` | 패널·슬롯 프레임 |
| `ui/ribbons/ribbons-big.png`, `ribbons-small.png` | 클리어 연출·업적 리본 (색상 변형 포함 시트) |
| `ui/papers/paper-regular.png`, `paper-special.png` | 설정·업적 패널 배경 |
| `ui/buttons/button-big-blue(-pressed).png` | 메인 버튼 스킨 |
| `ui/buttons/button-small-blue-round(-pressed).png` | 소형 버튼 |
| `ui/cursors/cursor-01~04.png` | 커스텀 커서 |

## 프로필 초상 25종 — `tiny-swords-free/avatars/`

`human-avatar-01.png` ~ `human-avatar-25.png` (256×256). 메타 허브 PRISM ID의 플레이어 프로필 선택지용.

## 전장 소품 — `tiny-swords-free/buildings/`, `tiny-swords-free/props/`

| 파일 | 용도 제안 |
| --- | --- |
| `buildings/building-purple-tower/monastery/castle.png` | 보라 지붕 유적 배경 소품 — 현 팔레트와 근접 |
| `buildings/building-black-tower/castle.png` | 어두운 원경 실루엣용 |
| `props/gold-stone-1~6.png` | 룬석 슬롯 마커·보상 크리스탈 후보 |
| `props/rock-1~4.png` | 청록빛 광석 소품 |
| `props/stump-1.png`, `tree-1.png`(6프레임), `bush-1.png`(8프레임) | 원심 정원 스테이지 장식 |
| `props/shadow.png` | 유닛 공용 그림자 |

## 전투 이펙트 — `tiny-swords-free/fx/`

| 파일 | 규격 | 프레임 | 용도 제안 |
| --- | --- | --- | --- |
| `fx/fx-explosion-01.png` | 1536x192 | 8 | 보스 명중·광역 폭발 |
| `fx/fx-explosion-02.png` | 1920x192 | 10 | 대형 폭발 (RIPOSTE·처치 연출) |
| `fx/fx-fire-01~03.png` | 512~768x64 | 8~12 | 묘기 배율(MULTIPLIER) 화염 연출 |
| `fx/fx-dust-01~02.png` | 512~640x64 | 8~10 | 유닛 이동·착지 먼지 |
| `fx/fx-water-splash.png` | 1728x192 | 9 | 변형해 프리즘 파편 연출 후보 |

## 이번에 반입하지 않은 것

- **Enemy Pack의 나머지 적** (Bear, Panda, Gnoll, Gnome, Lizard, Snake, Thief, Goblin Raiders 6종, Pirate Fish 6종): 필요해지면 같은 방식으로 선별. Windows PC `D:\Assets\Tiny Swords (Enemy Pack)`에 있음.
- **Free Pack의 Units 5색 세트·타일셋**: 로스터는 자체 제작 스프라이트로 확정되어 있고, 바닥 타일도 자체 타일이 이미 반입되어 있어 제외.
- **Ninja Adventure**: CC0라 오디오(SFX·음악)가 유력 후보였으나, 이 PC의 사본이 `Actor/Animal`만 있는 불완전본이라 반입 불가. 완전판을 다시 받으면 오디오 우선 검토.
- **Pipoya VFX 2종, Pixel Dungeon, Sprout Lands, Pixel Adventure, Pixel Art Top Down, UI 팩 3종, Helton Yan, Enemy_Animations_Set**: 공개 저장소 재배포 조건을 확인하지 못해 제외. 필요하면 라이선스 확인 후 개별 선별.
- **RuneCast·GravFlip 등 유니티 프로젝트 내 에셋**: 스토어 유료 에셋이 섞여 있을 수 있어 통째로 제외.

## 라이선스

Tiny Swords(Pixel Frog)는 기존 반입분과 동일한 조건을 따른다 — `ATTRIBUTION.md`의 Tiny Swords 항목 참조.
상업적 배포 전 원 팩의 이용 조건을 다시 확인한다.
