type Props = {
  name: string;
  moveToInitialPage: () => void;
  moveToResultPage: () => void;
};

export default function HumanSelectPage({ moveToInitialPage, moveToResultPage }: Props) {
  return (
    <div>
      사람이 직접 선택하는 페이지입니다...
      <div>
        <button
          data-nonblur="true"
          onClick={moveToInitialPage}
          className="w-[120px] py-2 border-2 rounded-lg mr-10"
        >
          이전
        </button>
        <button
          data-nonblur="true"
          onClick={moveToResultPage}
          className="w-[120px] py-2 border-2 rounded-lg"
        >
          다음
        </button>
      </div>
    </div>
  );
}
