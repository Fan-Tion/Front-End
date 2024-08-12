import {
  BoardSection,
  List,
  ListItem,
} from '../../styled-components/CommunityStyle';

interface Board {
  id: number;
  title: string;
}

interface BoardListProps {
  boards: Board[];
}

export default function BoardList({ boards }: BoardListProps) {
  return (
    <BoardSection>
      <List>
        {boards.map(board => (
          <ListItem key={board.id}>{board.title}</ListItem>
        ))}
      </List>
    </BoardSection>
  );
}
