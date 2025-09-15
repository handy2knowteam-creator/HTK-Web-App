import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPinIcon, BriefcaseIcon } from 'lucide-react';

export default function TradespersonProfileCard({
  tradesperson,
  onViewProfile,
  onContact,
}) {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-yellow-500">
          {tradesperson.name}
        </CardTitle>
        <div className="flex items-center text-yellow-400">
          <StarIcon className="h-5 w-5 fill-current" />
          <span className="ml-1 text-lg font-semibold">{tradesperson.rating}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-gray-300">
          <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{tradesperson.trade}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
          <span>{tradesperson.location}</span>
        </div>
        <p className="text-gray-400 text-sm">
          {tradesperson.description || 'Experienced and reliable tradesperson dedicated to quality work.'}
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900"
            onClick={() => onViewProfile(tradesperson.id)}
          >
            View Profile
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
            onClick={() => onContact(tradesperson.id)}
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

