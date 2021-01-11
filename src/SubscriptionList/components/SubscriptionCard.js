import { Card } from "antd";

const { Meta } = Card;

const SubscriptionCard = ({ id, title, version, isNew, onDelete, onDismissNew }) => {

  const dismissNew = () => {
    if (isNew) {
      onDismissNew(id);
    }
  };

  return (
    <div className={isNew ? "new-card" : null}>
      <Card className="subscription-card" style={{ margin: "0 10px 20px 10px" }} onClick={dismissNew}>
        <Meta
          title={title}
          description={version}
        />
        <button
          className="delete-button"
          onClick={() => onDelete(id)}
        >
          X
      </button>
      </Card>
    </div>

  );
};

export default SubscriptionCard;
