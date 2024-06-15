import React, { useRef, useMemo } from "react";
import {
  // StyleSheet,
  // Dimensions,
  TouchableWithoutFeedback,
  // SafeAreaView,
  View,
  Text,
  // TouchableOpacity,
} from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";
import { useTheme } from "@react-navigation/native";

import createStyles from "./HorizontalDatePicker.style";

interface HorizontalDatePickerProps {
  value: Date;
  setValue: (date: Date) => void;
  week: number;
  setWeek: (week: number) => void;
  children?: React.ReactNode;
}

export default function HorizontalDatePicker({
  value,
  setValue,
  week,
  setWeek,
  children,
}: HorizontalDatePickerProps) {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const swiper: any = useRef();

  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Swiper
          index={1}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={(ind) => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = week + newIndex;
              setWeek(newWeek);
              setValue(moment(value).add(newIndex, "week").toDate());
              swiper?.current.scrollTo(1, false);
            }, 100);
          }}
        >
          {weeks.map((dates, index) => (
            <View style={styles.itemRow} key={index}>
              {dates.map((item, dateIndex) => {
                const isActive =
                  value.toDateString() === item.date.toDateString();
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setValue(item.date)}
                  >
                    <View
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: "#111",
                          borderColor: "#111",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemWeekday,
                          isActive && { color: "#fff" },
                        ]}
                      >
                        {item.weekday}
                      </Text>
                      <Text
                        style={[styles.itemDate, isActive && { color: "#fff" }]}
                      >
                        {item.date.getDate()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <Text style={styles.subtitle}>{value.toDateString()}</Text>
        {children}
      </View>

      {/* <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Schedule</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
    </View>
  );
}
