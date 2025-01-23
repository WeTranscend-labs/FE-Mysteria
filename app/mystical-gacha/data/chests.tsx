import { ChestType, KeyPackage } from '../types/chest';
import { Box, Crown, Gem, Trophy } from 'lucide-react';

export const chests: ChestType[] = [
  {
    id: 'bronze',
    name: 'Bronze Chest',
    type: 'Bronze',
    description: 'Contains common treasures with a chance for rare items',
    image:
      'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80',
    keyPrice: 0.2,
    color: 'rgb(176, 141, 87)',
    glowColor: 'rgba(176, 141, 87, 0.5)',
    dropRates: {
      common: 60,
      rare: 30,
      superRare: 10,
    },
    icon: <Box className="w-6 h-6" />,
  },
  {
    id: 'silver',
    name: 'Silver Chest',
    type: 'Silver',
    description: 'Balanced mix of common and rare treasures',
    image:
      'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=800&q=80',
    keyPrice: 0.4,
    color: 'rgb(192, 192, 192)',
    glowColor: 'rgba(192, 192, 192, 0.5)',
    dropRates: {
      common: 40,
      rare: 40,
      superRare: 20,
    },
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    id: 'gold',
    name: 'Gold Chest',
    type: 'Gold',
    description: 'High chance for rare and super rare items',
    image:
      'https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=800&q=80',
    keyPrice: 0.6,
    color: 'rgb(255, 215, 0)',
    glowColor: 'rgba(255, 215, 0, 0.5)',
    dropRates: {
      common: 20,
      rare: 50,
      superRare: 30,
    },
    icon: <Gem className="w-6 h-6" />,
  },
  {
    id: 'legend',
    name: 'Legend Chest',
    type: 'Legend',
    description: 'Contains the rarest and most valuable treasures',
    image:
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80',
    keyPrice: 0.8,
    color: 'rgb(148, 0, 211)',
    glowColor: 'rgba(148, 0, 211, 0.5)',
    dropRates: {
      common: 10,
      rare: 40,
      superRare: 50,
    },
    icon: <Crown className="w-6 h-6" />,
  },
];

export const keyPackages: KeyPackage[] = [
  {
    id: 'bronze-1',
    name: 'Single Bronze Key',
    amount: 1,
    price: 0.2,
    discount: 0,
    type: 'Bronze',
    image:
      'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80',
  },
  {
    id: 'bronze-5',
    name: 'Bronze Key Pack',
    amount: 5,
    price: 1,
    discount: 10,
    type: 'Bronze',
    image:
      'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80',
  },
  {
    id: 'silver-1',
    name: 'Single Silver Key',
    amount: 1,
    price: 0.4,
    discount: 0,
    type: 'Silver',
    image:
      'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=800&q=80',
  },
  {
    id: 'silver-5',
    name: 'Silver Key Pack',
    amount: 5,
    price: 2,
    discount: 10,
    type: 'Silver',
    image:
      'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=800&q=80',
  },
  {
    id: 'gold-1',
    name: 'Single Gold Key',
    amount: 1,
    price: 0.6,
    discount: 0,
    type: 'Gold',
    image:
      'https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=800&q=80',
  },
  {
    id: 'gold-5',
    name: 'Gold Key Pack',
    amount: 5,
    price: 3,
    discount: 10,
    type: 'Gold',
    image:
      'https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=800&q=80',
  },
  {
    id: 'legend-1',
    name: 'Single Legend Key',
    amount: 1,
    price: 0.8,
    discount: 0,
    type: 'Legend',
    image:
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80',
  },
  {
    id: 'legend-5',
    name: 'Legend Key Pack',
    amount: 5,
    price: 4,
    discount: 10,
    type: 'Legend',
    image:
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80',
  },
];
