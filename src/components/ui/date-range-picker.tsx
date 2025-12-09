import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/shared/lib"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  dateRange: { from?: Date; to?: Date } | null
  onDateRangeChange: (range: { from?: Date; to?: Date } | null) => void
  placeholder?: string
  className?: string
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "בחר טווח תאריכים",
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const today = React.useMemo(() => new Date(), [])

  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      onDateRangeChange({
        from: range.from,
        to: range.to,
      })
      // Don't close automatically - let user close manually
    } else {
      onDateRangeChange(null)
    }
  }

  const displayText = React.useMemo(() => {
    if (!dateRange?.from) {
      return placeholder
    }

    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
    }

    return format(dateRange.from, "dd/MM/yyyy")
  }, [dateRange, placeholder])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-right font-normal rtl",
            "px-3 py-2 rounded-lg",
            "bg-white/5 border border-white/20",
            "text-white text-sm",
            "focus:outline-none focus:ring-2 focus:ring-red-500/50",
            "hover:bg-white/10",
            !dateRange && "text-gray-400",
            className
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-auto p-0",
          "max-w-[calc(100vw-2rem)] md:max-w-none",
          "bg-[#1a1a1c] border border-white/20",
          "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
          "rounded-[18px]"
        )}
        align="start"
        dir="rtl"
      >
        <div className="p-2">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from || today}
            selected={{
              from: dateRange?.from,
              to: dateRange?.to,
            }}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={{ after: today }}
            excludeDisabled
            className="bg-transparent text-[#f2f2f2]"
            classNames={{
              months: "flex-col",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium text-[#f2f2f2]",
              nav: "space-x-1 flex items-center",
              button_previous: "absolute right-1 text-[#f2f2f2] hover:bg-white/10",
              button_next: "absolute left-1 text-[#f2f2f2] hover:bg-white/10",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-[#f2f2f2]/60 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-white/10 [&:has([aria-selected])]:bg-[#ff2d55]/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-md",
              day_range_end: "day-range-end",
              day_selected: "bg-[#ff2d55] text-white hover:bg-[#ff2d55] hover:text-white focus:bg-[#ff2d55] focus:text-white",
              day_today: "bg-white/10 text-[#f2f2f2]",
              day_outside: "day-outside text-[#f2f2f2]/40 opacity-50 aria-selected:bg-white/10 aria-selected:text-[#f2f2f2]/40 aria-selected:opacity-30",
              day_disabled: "text-[#f2f2f2]/20 opacity-50",
              day_range_middle: "aria-selected:bg-[#ff2d55]/20 aria-selected:text-[#f2f2f2]",
              day_hidden: "invisible",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}