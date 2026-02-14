import ApplianceGrievances from '@/sections/ApplianceGrievances';
import { RecruitmentForm } from '@/components/RecruitmentForm';

const ResistancePage = () => {
    return (
        <div className="pt-0 min-h-screen bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <ApplianceGrievances />
                </div>
                <div className="md:col-span-1 pt-20">
                    <RecruitmentForm />
                </div>
            </div>
        </div>
    );
};

export default ResistancePage;
