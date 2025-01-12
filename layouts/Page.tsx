import { useEffect, useState } from "react";
import { MetricRow } from "types";
import { Category, Metric } from "./Components";

export const Page = ({
  setLoading,
  data,
  name,
}: {
  setLoading: (loading: boolean) => void;
  data: MetricRow[];
  name: string;
}) => {
  const [parentData, setParentData] = useState<MetricRow[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.parent_category.includes(name)
    );
    const dupCategories = filteredData.map((item) => item.child_category);
    const uniqueCategories = [...new Set(dupCategories)];
    setParentData(filteredData);
    setCategories(uniqueCategories);
  }, [data, name]);

  console.log(categories);

  return (
    <div>
      {categories &&
        categories.map((category: string) => (
          <Category key={category} title={category} setLoading={setLoading}>
            {parentData &&
              parentData.map((metric) => (
                <>
                  {metric.child_category === category && (
                    <Metric
                      key={metric.id}
                      title={metric.name}
                      description={metric.description}
                      metricData={metric}
                    />
                  )}
                </>
              ))}
          </Category>
        ))}
    </div>
  );
};
