import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects, getProjectBySlug } from "@/data/projects"
import ProjectDetail from "./ProjectDetail"

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        return { title: "Project Not Found | Ranjima Ghosh" }
    }

    return {
        title: `${project.title} | Ranjima Ghosh`,
        description: project.desc,
    }
}

export default async function ProjectPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return <ProjectDetail project={project} />
}
