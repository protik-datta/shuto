import { useState } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import usePageMeta from "../../hooks/usePageMeta";
import {
  MEASURING_STEPS,
  NUMERIC_SIZES,
  SIZE_GUIDE,
} from "../../data/sizeGuide";

function SizeTable({ caption, columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <caption className="mb-3 text-left font-semibold">{caption}</caption>
        <thead>
          <tr className="border-b border-ink">
            {columns.map((column) => (
              <th key={column} scope="col" className="py-2 pr-4 font-medium">
                {column}
                {column !== "Size" && (
                  <span className="font-normal text-stone"> (cm)</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([size, ...values]) => (
            <tr key={size} className="border-b border-line">
              <th scope="row" className="py-3 pr-4 font-medium">
                {size}
              </th>
              {values.map((value, index) => (
                <td key={columns[index + 1]} className="py-3 pr-4">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuide() {
  const [group, setGroup] = useState("women");
  usePageMeta({
    title: "Size guide",
    description:
      "Body measurements in centimetres for women and men, with numeric sizes for trousers and jeans.",
  });
  const guide = SIZE_GUIDE[group];

  return (
    <div className="container-page py-6 lg:py-8">
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Size guide" }]}
      />
      <h1 className="mt-4 text-h1 font-semibold">Size guide</h1>
      <p className="mt-2 max-w-xl text-stone">
        All measurements are of the body, in centimetres. If you are between
        sizes, go up for knitwear and jeans.
      </p>

      <div
        role="group"
        aria-label="Choose a size chart"
        className="mt-8 flex gap-6 border-b border-line"
      >
        {Object.entries(SIZE_GUIDE).map(([id, { label }]) => (
          <button
            key={id}
            type="button"
            onClick={() => setGroup(id)}
            aria-pressed={group === id}
            className={`border-b-2 pb-2 text-sm ${group === id ? "border-ink font-medium" : "border-transparent text-stone hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <SizeTable
            caption={`${guide.label}: tops, knitwear and dresses`}
            columns={guide.columns}
            rows={guide.rows}
          />
          <SizeTable
            caption="Trousers and jeans (numeric sizes)"
            columns={NUMERIC_SIZES.columns}
            rows={NUMERIC_SIZES.rows}
          />
        </div>
        <section aria-labelledby="measure-heading">
          <h2 id="measure-heading" className="text-h2 font-semibold">
            How to measure
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            {MEASURING_STEPS.map(({ title, text }) => (
              <div key={title}>
                <dt className="font-medium">{title}</dt>
                <dd className="text-charcoal">{text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
