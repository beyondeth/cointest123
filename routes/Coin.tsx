import { useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  state: {
    name: string;
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<string>();
  const { state } = useLocation() as RouteState;
  console.log(coinId);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
        {/* state가 존재하면 name을 불러오고 없으면 로딩... */}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
