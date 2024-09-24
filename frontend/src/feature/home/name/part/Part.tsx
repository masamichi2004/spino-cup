import RepositoryInfo from '@/src/components/RepositoryInfo';
import RepositoryList from '@/src/components/RepositoryList';

const PartPage = () => {
  return (
    <div className="p-4">
      <h1>
        <div>
          <RepositoryInfo />
          <hr className="border border-gray-300 px-0" />
          <RepositoryList />
        </div>
      </h1>
    </div>
  );
};

export default PartPage;
