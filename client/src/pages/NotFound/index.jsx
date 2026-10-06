import NotFoundView from "../../components/common/NotFoundView";
import usePageMeta from "../../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({
    title: "Page not found",
    description: "This page does not exist.",
  });
  return <NotFoundView />;
}
