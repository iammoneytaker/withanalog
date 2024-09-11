import Image from 'next/image';
import Link from 'next/link';
import { Application } from '../data/applications';

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Image
          src={application.icon}
          alt={application.name}
          width={64}
          height={64}
          className="rounded-xl mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{application.name}</h2>
          <p className="text-gray-400 text-sm">{application.slogan}</p>
        </div>
      </div>
      <Link href={`/application/${application.id}`}>
        <span className="block w-full bg-blue-500 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          상세보기
        </span>
      </Link>
    </div>
  );
}
