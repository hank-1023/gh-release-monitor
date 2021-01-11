import SearchDropdown from './components/SearchDropdown';
import SubscriptionCard from './components/SubscriptionCard';
import './SubscriptionList.css';

const SubscriptionList = ({ repos, onAdd, onDelete, onDismissNew }) => {
  return (
    <div className="subscription-list">
      <SearchDropdown onAdd={onAdd} />
      <div className="subscription-scroll-view">
        {
          Object.values(repos)
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map((repo) => (
              <SubscriptionCard
                key={repo.id}
                id={repo.id}
                title={repo.name}
                version={repo.version}
                onDelete={onDelete}
                onDismissNew={onDismissNew}
              />
            ))
        }
      </div>
    </div>

  );
};

export default SubscriptionList;
