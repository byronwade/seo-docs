import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Rocket, Bell, User, Settings, LogOut } from "lucide-react"

export function TopNavBar({ setIsCommandPaletteOpen, hasChanges, deploymentProgress, setDeploymentProgress, handleDeploy }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <Button variant="outline" className="w-64" onClick={() => setIsCommandPaletteOpen(true)}>
        <Search className="h-4 w-4 mr-2" />
        Search...
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <div className="flex items-center space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Rocket className="h-4 w-4 mr-2" />
              Deploy
              {hasChanges && <Badge variant="destructive" className="ml-2">1</Badge>}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deploy Changes</DialogTitle>
              <DialogDescription>
                Are you sure you want to deploy your changes to production?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeploymentProgress(null)}>Cancel</Button>
              <Button onClick={handleDeploy}>Deploy</Button>
            </div>
            {deploymentProgress !== null && (
              <div className="mt-4">
                <div className="bg-secondary h-2 rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${deploymentProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-center mt-2">
                  {deploymentProgress < 100 ? "Deploying..." : "Deployment complete!"}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuItem>New user registered</DropdownMenuItem>
            <DropdownMenuItem>Deployment successful</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">shadcn</p>
                <p className="text-xs leading-none text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
