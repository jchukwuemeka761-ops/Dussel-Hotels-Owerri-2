import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import { isAdminAuthenticated } from '@/lib/server-auth';
import { getPublicHotelData } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Management Portal | Dussel Hotels Owerri',
  description:
    'Manage room rates, food menu, drinks bar pricing, services, hotel photos, slideshows, and admin security.',
};

export default async function AdminPage() {
  const [authenticated, data] = await Promise.all([
    isAdminAuthenticated(),
    Promise.resolve(getPublicHotelData()),
  ]);

  return (
    <div className="relative min-h-screen py-10 sm:py-14">
      {/* Fancy Illuminated Night View of Dussel Hotels as Admin Backdrop */}
      <BackgroundSlideshow
        slides={data.slideshows.adminPage}
        variant="page"
        intervalMs={5000}
        showControls={false}
        scrimClassName="bg-gradient-to-b from-[#070910]/42 via-[#090B14]/35 to-[#07080E]/60"
        label="Dussel Night View"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminDashboard initialAuthenticated={authenticated} initialData={data} />
      </div>
    </div>
  );
}
