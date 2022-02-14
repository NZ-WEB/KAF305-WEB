import { CreatePageProps } from './CreatePage.props';
import { withLayout } from '../../../../layout/Layout';

const CreatePage = ({}: CreatePageProps): JSX.Element => {
  return <h1>create</h1>;
};

export default withLayout(CreatePage);
