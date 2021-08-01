import Layout from "../components/layout";
import QueryResult from "../components/query-result";
import ModuleDetails from "../components/module-detail";
import { useQuery, gql } from "@apollo-client";
const MODULE_QUERY = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;
const Module = ({ trackId, moduleId }) => {
  const { data, error, loading } = useQuery(MODULE_QUERY, {
    variables: {
      trackId,
      moduleId
    }
  });
  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
