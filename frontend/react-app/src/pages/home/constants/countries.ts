export const countries = [
  "프랑스",
  "일본",
  "미국",
  "영국",
  "이탈리아",
  "스페인",
  "독일",
  "중국",
  "호주",
  "캐나다",
  "러시아",
  "브라질",
  "인도",
  "터키",
  "이집트",
  "남아프리카공화국",
  "태국",
  "그리스",
  "아랍에미리트",
  "포르투갈",
  "스웨덴",
  "네덜란드",
  "노르웨이",
  "아르헨티나",
  "칠레",
  "뉴질랜드",
  "핀란드",
  "덴마크",
  "벨기에",
  "스위스",
  "오스트리아",
  "헝가리",
  "체코",
  "폴란드",
  "루마니아",
  "불가리아",
  "크로아티아",
  "슬로바키아",
  "슬로베니아",
  "이스라엘",
];

type Country = (typeof countries)[number];

export type CityMap = {
  [key: Country]: string[];
};
export const cityMap: CityMap = {
  프랑스: ["파리", "니스", "리옹", "마르세유", "보르도"],
  일본: ["도쿄", "교토", "오사카", "후쿠오카", "삿포로"],
  미국: ["뉴욕", "로스앤젤레스", "샌프란시스코", "라스베이거스", "마이애미"],
  영국: ["런던", "에든버러", "맨체스터", "리버풀", "옥스퍼드"],
  이탈리아: ["로마", "베네치아", "피렌체", "밀라노", "나폴리"],
  스페인: ["바르셀로나", "마드리드", "세비야", "그라나다", "발렌시아"],
  독일: ["베를린", "뮌헨", "프랑크푸르트", "함부르크", "쾰른"],
  중국: ["베이징", "상하이", "광저우", "시안", "청두"],
  호주: ["시드니", "멜버른", "브리즈번", "퍼스", "애들레이드"],
  캐나다: ["토론토", "밴쿠버", "몬트리올", "퀘벡 시티", "오타와"],
  러시아: ["모스크바", "상트페테르부르크", "노보시비르스크", "카잔", "소치"],
  브라질: ["리우데자네이루", "상파울루", "브라질리아", "살바도르", "포르투 알레그리"],
  인도: ["델리", "뭄바이", "아그라", "자이푸르", "벵갈루루"],
  터키: ["이스탄불", "앙카라", "안탈리아", "카파도키아", "이즈미르"],
  이집트: ["카이로", "알렉산드리아", "루크소르", "아스완", "샤름 엘 셰이크"],
  남아프리카공화국: ["케이프타운", "요하네스버그", "더반", "프리토리아", "포트 엘리자베스"],
  태국: ["방콕", "치앙마이", "푸켓", "파타야", "끄라비"],
  그리스: ["아테네", "산토리니", "미코노스", "크레타", "로도스"],
  아랍에미리트: ["두바이", "아부다비", "샤르자", "알 아인", "푸자이라"],
  포르투갈: ["리스본", "포르투", "파로", "신트라", "마데이라"],
  스웨덴: ["스톡홀름", "예테보리", "말뫼", "우메오", "룰레오"],
  네덜란드: ["암스테르담", "로테르담", "헤이그", "위트레흐트", "마스트리흐트"],
  노르웨이: ["오슬로", "베르겐", "트롬쇠", "스타방에르", "트론헤임"],
  아르헨티나: ["부에노스아이레스", "코르도바", "로사리오", "멘도사", "우수아이아"],
  칠레: ["산티아고", "발파라이소", "푸에르토 몬트", "푸콘", "아타카마"],
  뉴질랜드: ["오클랜드", "웰링턴", "퀸스타운", "크라이스트처치", "로토루아"],
  핀란드: ["헬싱키", "로바니에미", "투르쿠", "탐페레", "오울루"],
  덴마크: ["코펜하겐", "오덴세", "오르후스", "알보르그", "에스비에르"],
  벨기에: ["브뤼셀", "브뤼헤", "안트베르펜", "겐트", "리에주"],
  스위스: ["취리히", "제네바", "베른", "루체른", "인터라켄"],
  오스트리아: ["빈", "잘츠부르크", "인스브루크", "그라츠", "클라겐푸르트"],
  헝가리: ["부다페스트", "데브레첸", "세게드", "미슈콜츠", "페치"],
  체코: ["프라하", "브르노", "플젠", "오스트라바", "올로모우츠"],
  폴란드: ["바르샤바", "크라쿠프", "그단스크", "브로츠와프", "포즈난"],
  루마니아: ["부쿠레슈티", "클루지나포카", "티미쇼아라", "브라쇼브", "콘스탄차"],
  불가리아: ["소피아", "플로브디프", "바르나", "부르가스", "벨리코타르노보"],
  크로아티아: ["자그레브", "두브로브니크", "스플리트", "자다르", "리예카"],
  슬로바키아: ["브라티슬라바", "코시체", "트르나바", "즐리나", "니트라"],
  슬로베니아: ["류블랴나", "마리보르", "체리케", "포스토이나", "피란"],
  이스라엘: ["예루살렘", "텔아비브", "하이파", "베들레헴", "나사렛"],
};
