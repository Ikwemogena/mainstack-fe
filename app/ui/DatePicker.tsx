import { ElementRef, useEffect, useRef, useState } from "react"
import flatpickr from "flatpickr"

import { Instance as Flatpickr } from "flatpickr/dist/types/instance"
import "flatpickr/dist/flatpickr.min.css"

interface DatePickerProps {
    onChange: (date: Date[]) => void,
    defaultDate: Date;
}
const DatePicker: React.FC<DatePickerProps> = ({ onChange, defaultDate }) => {
    const [flatpickrInstance, setFlatpickrInstance] = useState<Flatpickr>()
    const datePickerRef = useRef<ElementRef<"input">>(null)
    const dates = useRef<Date[]>()
    const [applyDate, setApplyDate] = useState(() => () => { })

    useEffect(() => {
        if (datePickerRef.current) {
            const flatpickrInstance = flatpickr(datePickerRef.current, {
                dateFormat: "M  j  Y",
                closeOnSelect: false,
                defaultDate: defaultDate,
                onChange: (selectedDates) => {
                    if (selectedDates.length === 0) {
                        onChange([])
                        dates.current = []
                    }

                    dates.current = selectedDates
                    onChange(selectedDates)
                    flatpickrInstance.close()
                },
                onClose: () => {
                    if (dates.current) {
                        flatpickrInstance.setDate(dates.current)
                    }
                },
            })
        }

        setFlatpickrInstance(flatpickrInstance)

        return () => flatpickrInstance?.destroy()
    }, [])

    return (
        <div className="calendar">
            <input ref={datePickerRef} type="text" placeholder="Select date..." />
        </div>
    )
}

export default DatePicker;