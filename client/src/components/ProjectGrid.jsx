import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';

export default function ProjectGrid({ projects = [] }) {
  if (projects.length === 0) {
    return <EmptyState title="No projects found" description="There are currently no projects to display." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
