import { ReactElement } from "react";
import "./App.css";
import tweets from "./tweets";
import { formatDistance } from "date-fns";

function Circle() {
  return <div className="circle" />;
}

interface FooterProps {
  fixed?: boolean;
}
function Footer(props: FooterProps) {
  const cn = "flex px py align-items";
  return (
    <div
      className={
        props.fixed ? `fixed-bottom space-around ${cn}` : `space-between ${cn}`
      }
    >
      <div>❤️</div>
      <div>❤️</div>
      <div>❤️</div>
      <div>❤️</div>
    </div>
  );
}

function Tweet(props) {
  return (
    <div className="flex tweet px">
      <div className="flex column">
        {/* these urls don't seem to work
        just going to leave the circle in
        <img src={props.user.profile_img_url} />
        */}
        <Circle />
      </div>
      <div className="flex column">
        <div className="flex small-text">
          <b>{props.user.name}</b>
          <div className="pl">@{props.user.screen_name}</div>
          <div className="pl">
            {" "}
            - {formatDistance(new Date(props.created_at), Date.now())}
          </div>
        </div>
        <div>{props.text}</div>
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="fixed-top flex align-items px py">
      <Circle />
      <div>
        <b>Home</b>
      </div>
      <div className="ml-auto">❤️</div>
    </div>
  );
}

function App(): ReactElement {
  return (
    <>
      <Header />
      <div className="tweets-container">
        {tweets.map((t) => (
          <Tweet key={t.id} {...t} />
        ))}
      </div>
      <Footer fixed />
    </>
  );
}

export default App;
