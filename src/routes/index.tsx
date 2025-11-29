import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <div className="center card outlined p-4 radius-3"></div>;
}
