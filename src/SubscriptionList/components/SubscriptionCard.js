import { useMemo } from 'react';
import { Card, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

const SubscriptionCard = ({ repo, onDelete, onDismissNew, onSelect, selected }) => {

  const onCardClick = () => {
    if (repo.hasNewVersion) {
      onDismissNew(repo.id);
    }
    onSelect(repo.id);
  };

  const dateDescription = useMemo(() => {
    const dateObj = new Date(repo.date);
    return dateObj.toDateString();
  }, [repo.date]);

  return (
    <div
      className={`subscription-card${repo.hasNewVersion ? " new-card" : ""}${selected ? " selected-card" : ""}`}
      onClick={onCardClick}
    >
      <Meta
        title={repo.name}
        description={repo.version}
      />
      <Text
        type="secondary"
        style={{ display: "block", marginTop: "12px" }}
      >
        {`Lastest release: ${dateDescription}`}
      </Text>
      <button className="delete-button" onClick={() => onDelete(repo.id)}>X</button>
    </div>

  );
};

export default SubscriptionCard;
