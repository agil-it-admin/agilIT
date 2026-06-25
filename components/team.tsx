import Image from "next/image"
import { team } from "@/lib/data"

export function Team() {
  return (
    <section
      id="team"
      className="border-y border-border bg-muted/30 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-muted-foreground">
            Our team
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Advisors who know the market
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Seasoned infrastructure specialists who help you navigate
            colocation, cloud, and connectivity decisions with clarity.
          </p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <li
              key={member.id}
              className="overflow-hidden border border-border bg-card"
            >
              <div className="relative aspect-square border-b border-border bg-muted">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 384px"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
