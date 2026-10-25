import type { Project } from '@/data/projects'
import { SectionHeading } from './SectionHeading'

// Result tables, such as model comparisons.
export function DataTables({ tables }: { tables: NonNullable<Project['caseStudy']['tables']> }) {
  return (
    <>
      {tables.map((t) => (
        <section key={t.title} className="mt-14">
          <SectionHeading>{t.title}</SectionHeading>
          <div className="overflow-x-auto rounded-lg border border-border-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-soft bg-background-soft">
                  {t.headers.map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-medium text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border-soft last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-foreground-muted">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  )
}
