import SearchDropdown from './components/SearchDropdown';
import SubscriptionCard from './components/SubscriptionCard';
import './SubscriptionList.css';

const SubscriptionList = ({ repos, onAdd, onDelete }) => {
  return (
    <div className="subscription-list">
      <div className="search-bar">
        <SearchDropdown onAdd={onAdd} />
      </div>
      <div className="subscription-scroll-view">
        {
          Object.values(repos)
            .sort((a, b) => a.date > b.date)
            .map((repo) => (
              <SubscriptionCard
                key={repo.id}
                id={repo.id}
                title={repo.name}
                version={repo.version}
                onDelete={onDelete}
              />
            ))
        }
      </div>
    </div>

  );
};

export default SubscriptionList;
