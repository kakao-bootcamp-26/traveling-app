type Props = {
  params: {
    nickname: string;
  };
};

export default function ProfilePage({ params: { nickname } }: Props) {
  const decodedNickname = decodeURIComponent(nickname);
  return <div>{decodedNickname}</div>;
}
