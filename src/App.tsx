import "./index.css";
import "./global.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { Layout } from "./routes/Layout";
import { AppRouters } from "./routes/AppRouters";
import { AuthRouters } from "./routes/AuthRouters";
import { Loading } from "./common/Loading";

export function App() {
  const { user, authIsReady } = useAuthContext();
  
  if (!authIsReady) return <Loading />;

  return (
    <Layout>
     {user ? <AppRouters/> : <AuthRouters/>}
    </Layout>
  );
}
