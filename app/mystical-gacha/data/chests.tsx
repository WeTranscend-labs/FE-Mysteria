import { ChestType, KeyPackage } from '../types/chest';
import { Box, Crown, Gem, Trophy } from 'lucide-react';

export const chests: ChestType[] = [
  {
    id: 'bronze',
    name: 'Bronze Chest',
    type: 'Bronze',
    description: 'Contains common treasures with a chance for rare items',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628546/Mysteria/bronze_chest_bmjoqe.png',
    keyImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631311/Mysteria/bronze_key_hhutdx.png',
    keyPrice: 10,
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
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628564/Mysteria/silver_chest_sk1cdm.png',
    keyImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631567/Mysteria/silver_key_f8gfmc.png',
    keyPrice: 20,
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
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628510/Mysteria/gold_chest_sxzr94.png',
    keyImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631028/Mysteria/gold_key_uerc2h.png',
    keyPrice: 40,
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
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631256/Mysteria/legendary_chest_cwrua9.png',
    keyImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631835/Mysteria/legend_key_11zon_qzboxj.png',
    keyPrice: 80,
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
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631311/Mysteria/bronze_key_hhutdx.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628546/Mysteria/bronze_chest_bmjoqe.png',
  },
  {
    id: 'bronze-5',
    name: 'Bronze Key Pack',
    amount: 5,
    price: 1,
    discount: 10,
    type: 'Bronze',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631311/Mysteria/bronze_key_hhutdx.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628546/Mysteria/bronze_chest_bmjoqe.png',
  },
  {
    id: 'silver-1',
    name: 'Single Silver Key',
    amount: 1,
    price: 0.4,
    discount: 0,
    type: 'Silver',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631567/Mysteria/silver_key_f8gfmc.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628564/Mysteria/silver_chest_sk1cdm.png',
  },
  {
    id: 'silver-5',
    name: 'Silver Key Pack',
    amount: 5,
    price: 2,
    discount: 10,
    type: 'Silver',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631567/Mysteria/silver_key_f8gfmc.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628564/Mysteria/silver_chest_sk1cdm.png',
  },
  {
    id: 'gold-1',
    name: 'Single Gold Key',
    amount: 1,
    price: 0.6,
    discount: 0,
    type: 'Gold',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631028/Mysteria/gold_key_uerc2h.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628510/Mysteria/gold_chest_sxzr94.png',
  },
  {
    id: 'gold-5',
    name: 'Gold Key Pack',
    amount: 5,
    price: 3,
    discount: 10,
    type: 'Gold',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631028/Mysteria/gold_key_uerc2h.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737628510/Mysteria/gold_chest_sxzr94.png',
  },
  {
    id: 'legend-1',
    name: 'Single Legend Key',
    amount: 1,
    price: 0.8,
    discount: 0,
    type: 'Legend',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631835/Mysteria/legend_key_11zon_qzboxj.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631256/Mysteria/legendary_chest_cwrua9.png',
  },
  {
    id: 'legend-5',
    name: 'Legend Key Pack',
    amount: 5,
    price: 4,
    discount: 10,
    type: 'Legend',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631835/Mysteria/legend_key_11zon_qzboxj.png',
    chestImage:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737631256/Mysteria/legendary_chest_cwrua9.png',
  },
];
