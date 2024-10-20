import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { FileText, Rocket, Settings, User } from "lucide-react"

export function CommandPalette({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
	return (
		<CommandDialog open={isOpen} onOpenChange={setIsOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<FileText className="mr-2 h-4 w-4" />
						<span>New Post</span>
						<CommandShortcut>⌘N</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Rocket className="mr-2 h-4 w-4" />
						<span>Deploy</span>
						<CommandShortcut>⌘D</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<User className="mr-2 h-4 w-4" />
						<span>User Settings</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
					<CommandItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>System Preferences</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
