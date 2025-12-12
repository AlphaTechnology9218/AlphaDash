import { LayoutDashboard, History, BarChart3, Settings, Leaf, ChevronLeft, Cpu, FlaskConical, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import type { ViewType, AreaType } from "@/pages/Index";

interface AppSidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  currentArea: AreaType;
  onAreaChange: (area: AreaType) => void;
}

const menuItems = [
  { id: "dashboard" as ViewType, title: "Dashboard", icon: LayoutDashboard },
  { id: "history" as ViewType, title: "Histórico", icon: History },
  { id: "analytics" as ViewType, title: "Análises", icon: BarChart3 },
  { id: "settings" as ViewType, title: "Configurações", icon: Settings },
];

const areaItems = [
  { id: "te" as AreaType, title: "Tecnologia e Engenharia", shortTitle: "TE", icon: Cpu },
  { id: "mc" as AreaType, title: "Mérito Científico", shortTitle: "MC", icon: FlaskConical },
  { id: "om" as AreaType, title: "Organização e Método", shortTitle: "OM", icon: FolderKanban },
];

export function AppSidebar({ currentView, onViewChange, currentArea, onAreaChange }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className={cn(
        "border-r border-sidebar-border gradient-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5 text-sidebar-primary" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h2 className="font-display font-bold text-sidebar-foreground">
                AlphaDash
              </h2>
              <p className="text-xs text-sidebar-foreground/60">
                v1.0
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Areas Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider mb-2 px-3">
            {!isCollapsed && "Áreas"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {areaItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onAreaChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                      currentArea === item.id
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 flex-shrink-0",
                      currentArea === item.id ? "text-accent-foreground" : ""
                    )} />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{item.shortTitle}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation Section - Only show for TE area */}
        {currentArea === "te" && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider mb-2 px-3">
              {!isCollapsed && "Navegação"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                        currentView === item.id
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className={cn(
                        "w-5 h-5 flex-shrink-0",
                        currentView === item.id ? "text-sidebar-primary-foreground" : ""
                      )} />
                      {!isCollapsed && (
                        <span className="font-medium text-sm">{item.title}</span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronLeft className={cn(
            "w-4 h-4 transition-transform duration-200",
            isCollapsed && "rotate-180"
          )} />
          {!isCollapsed && <span className="ml-2 text-xs">Recolher</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
