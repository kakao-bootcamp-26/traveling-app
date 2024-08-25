import React from "react";
import { HotelInfo } from "@/shared/entities/hotelCuration.entity";
import { Link } from "react-router-dom";

type Props = { hotelInfo: HotelInfo };

export default function HotelCurationItem({ hotelInfo }: Props) {
  return (
    <article key={hotelInfo.id} className="min-w-[400px]  bg-dark-blue-2 mb-6 px-6 py-4 rounded-md">
      <div className="flex gap-x-6">
        <div
          style={{
            borderRadius: "10px",
            width: "150px",
            height: "150px",
            backgroundImage: `url(${hotelInfo.image})`,
            backgroundSize: "cover" /* 이미지가 요소를 덮도록 설정 */,
            backgroundPosition: "center" /* 중앙을 기준으로 위치 조정 */,
            backgroundRepeat: "no-repeat" /* 반복되지 않도록 설정 */,
          }}
        ></div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-y-4">
            <h6 className="text-[16px]">{hotelInfo.name}</h6>
            <div>가격: {hotelInfo.price.toLocaleString("en-US")}</div>
            <div>평점: {hotelInfo.overallRating}</div>
          </div>

          <div>
            <button className="px-4 py-2 rounded-md bg-sky-400">
              <Link to={hotelInfo.clkLogUrl} target="_blank">
                바로가기
              </Link>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
