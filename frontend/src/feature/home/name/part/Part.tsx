import RepositoryInfo from '@/src/components/RepositoryInfo';
import RepositoryList from '@/src/components/RepositoryList';

const PartPage = () => {
  return (
    <div style={{ padding: '16px' }}>
      <h1>
        <div>
          <RepositoryInfo />
          <RepositoryList />
        </div>
      </h1>
    </div>
  );
};

export default PartPage;
