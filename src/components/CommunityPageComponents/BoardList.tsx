import {
  BoardSection,
  List,
  ListItem,
} from '../../styled-components/CommunityStyle';

interface Board {
  postId: number;
  channelName: string;
  nickname: string;
  title: string;
  content: string;
  likeCnt: number;
  viewCnt: number;
  createDate: string;
  status: string;
}

interface BoardListProps {
  boards: Board[];
}

export default function BoardList({ boards }: BoardListProps) {
  if (!boards || boards.length === 0) {
    return <ListItem>게시글이 없습니다.</ListItem>;
  }
  return (
    <BoardSection>
      <List>
        {boards.map(board => (
          <ListItem key={board.postId}>{board.title}</ListItem>
        ))}
      </List>
    </BoardSection>
  );
}
