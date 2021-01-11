import { Card } from "antd";

const { Meta } = Card;

const SubscriptionCard = ({ title, version, isNew, onDelete }) => {
  return (
    <Card className="subscription-card" style={{ margin: "0 10px 20px 10px" }}>
      <Meta
        title={title}
        description={version}
      />
      <button
        className="close-button"
        onClick={onDelete}
      >
        X
      </button>
    </Card>
  );
};

export default SubscriptionCard;
