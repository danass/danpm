'use client'; // Though not strictly necessary for an object export, good for consistency if it ever includes hooks/components

// Import Heroicons
import {
  LightBulbIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon, MagnifyingGlassIcon, 
  ChartBarIcon, CheckCircleIcon, ArrowDownTrayIcon, MapIcon, LinkIcon, 
  CodeBracketIcon, TableCellsIcon, UsersIcon, ShieldCheckIcon, ComputerDesktopIcon,
  // Icons from AboutPage components or other areas, ensure they are here if used via iconName
  BriefcaseIcon, AcademicCapIcon, SparklesIcon, Bars3Icon // Added Bars3Icon from original map
} from '@heroicons/react/24/outline'; // Assuming most are outline

// If some are solid, import them separately
// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export const iconMap = {
  LightBulbIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  MapIcon,
  LinkIcon,
  CodeBracketIcon,
  TableCellsIcon,
  UsersIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  BriefcaseIcon, 
  AcademicCapIcon,
  SparklesIcon,
  Bars3Icon
  // For solid icons, if needed:
  // ChevronUpIcon, 
  // ChevronDownIcon
}; 