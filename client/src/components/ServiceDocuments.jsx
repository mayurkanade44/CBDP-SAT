import Card from "./Card";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loading from "./Loading";

const ServiceDocuments = () => {
  const { allDocs, docLoading } = useSelector((store) => store.doc);

  if (docLoading) return <Loading />;

  return (
    <div className="row gy-3">
      {allDocs?.map((item) => {
        return (
          <motion.div layout className="col-4" key={item._id}>
            <Card {...item} />
          </motion.div>
        );
      })}
    </div>
  );
};
export default ServiceDocuments;
