import { LayoutDashboard, Users, BookOpen, HelpCircle, BarChart2, Settings } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold">Quyl.</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Students', icon: Users },
                { name: 'Chapter', icon: BookOpen },
                { name: 'Help', icon: HelpCircle },
                { name: 'Reports', icon: BarChart2 },
                { name: 'Settings', icon: Settings },
              ].map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.name === 'Students'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      item.name === 'Students'
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};