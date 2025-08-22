import { TabsTrigger } from "@radix-ui/react-tabs";

interface HeaderTabLinkProps {
    icon?: React.ElementType;
    label: string;
    value: string;
}

export function HeaderTabLink({ icon: Icon, label, value }: HeaderTabLinkProps) {
    return (
        <TabsTrigger
            value={value}
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            {Icon && <Icon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />}
            {label}
          </TabsTrigger>
    )
}