import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  pageTitle: React.ReactNode | string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-dark dark:text-gray-light/80  italic">
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5 ">
          <li>
            <Link
              className="inline-flex items-center gap-1 text-sm text-gray hover:text-brand dark:text-gray-light/80 dark:hover:text-brand-light transition-colors"
              href="/"
            >
              Inicio
              <ChevronRight className="h-4 w-4 stroke-[1.5] rtl:rotate-180" />
            </Link>
          </li>
          <li className="text-sm text-gray/90 dark:text-gray-light/80  border-b border-gray/50 italic">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
