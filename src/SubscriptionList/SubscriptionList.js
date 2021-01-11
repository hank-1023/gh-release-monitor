import SearchDropdown from './components/SearchDropdown';
import SubscriptionCard from './components/SubscriptionCard';
import './SubscriptionList.css';

const SubscriptionList = () => {
  return (
    <div className="subscription-list">
      <div className="search-bar">
        <SearchDropdown />
      </div>
      <div className="subscription-scroll-view">
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
        <SubscriptionCard title="VSCode" version="1.0" />
      </div>
    </div>

  );
};

export default SubscriptionList;
