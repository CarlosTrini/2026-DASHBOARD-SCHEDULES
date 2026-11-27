'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Metrics from "./components/Metrics";
import StaffTable from "./components/StaffTable";

const StaffView = () => {
    return (
        <div className="max-h-[calc(100dvh-8rem)] flex flex-col min-h-0  overflow-hidden">
            <div className="shrink-0">
                <PageBreadcrumb pageTitle="Administración del personal" />
            </div>
            <div className="shrink-0">
                <Metrics />
            </div>
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden mt-8">
                <StaffTable />
            </div>
        </div>
    );
};

export default StaffView;
