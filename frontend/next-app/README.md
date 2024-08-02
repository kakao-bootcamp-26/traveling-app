# 블로그

## 아키텍처 - FSD

### Layer

- app: 애플리케이션 로직이 초기화되는 곳.  
  Provider, Router, 전역 스타일, 전역 타입 선언들이 들어감

- pages: 애플리케이션의 페이지가 포함됨

- widgets: 페이지에 사용되는 독립적인 UI 컴포넌트(레이아웃, Feature를 묶는 것)
  고민할 거리) 어디까지 묶어야 재사용이 용이할지..?

- features: 이 레이어는 비즈니스 가치를 전달하는 사용자 시나리오와 기능을 다룸.  
  ex) 좋아요, 리뷰 작성, 제품 평가 등  
  -> 동사가 slice / api segment에서는 해당 행동을 요청함

- entities: 비즈니스 엔티티를 나타냄
  ex) 사용자, 리뷰, 댓글 등
  -> 데이터가 slice / api segment에서는 해당 데이터를 조회

- shared: 특정 비즈니스 로직에 종속되지 않은 재사용 가능한 컴포넌트와 유틸리티가 포함되어 있음  
  -> slice가 없는 유일한 계층

### Slice (Domain)

### Segment

- ui
- model
- api
- lib: 기타 유틸
- const: 상수
