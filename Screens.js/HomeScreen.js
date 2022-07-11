import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import tw from "twrnc";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);
  const [profilePics, setProfilePics] = useState(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),  
    []
  );


  useEffect(() => {
    const fetchProfilePicture = async () => {
        const pics =  await (await getDoc(doc(db, "users", user.uid))).data()
        const passedPics = pics?.photoURL ? pics.photoURL : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACQCAMAAADtCnPsAAAANlBMVEWhoaHu7u6enp7x8fGxsbGbm5v09PTp6enk5OTLy8vAwMDW1tbb29u8vLy1tbWtra2np6eVlZXlN6PXAAAEUElEQVR4nO2bB7ajMAxFbQs3+ux/s2NImeSHoicw4c/hLYBzI6tYsqL0iaS+DfCqC2ZOF8ycLpg5/S8wpIkcaR+SvP8qDPkq1GXXq66JVV0HT0TfgnF133bWGDWq74q2ibV2bhOQFKax6g5ylzHWWlPE2st5hDDNO8kLkumaID0wEQxFO81yA7JFLaMRwKTf3S2wjPZpgwQHhnE+NsUyy4CjKpcdhkJjnjG0KFvitsFgKPYcECkNBlOtH9AWGgiGIsCSHKcCaRAY0ksRPUUTMsLMpbpZmCIfjO8xFvigABiqQcMMygZTwZZRFjINckwBh1Ed8P3sx2SQmonALNbqOZgWqFEAjGsFllEGuB0jMCsXhxkYwIURGAmLMkCFQnxGBgNk4ewwSvGdJj8MUC3zw9g6B4wTJGAFVYRfC1NIkl4umFIGw69OuWtTLgfWkqqdYLKEtug+ozIlPe2RrumhTOVAk8SDTZMJppLcrmKWqp1oJDDAcASBcSRJe4E/V0PyTPEHR0mhzU/BfBiRxwwybQaYKMp5Q3CfCYYdTwfAKHY9QHxGBgO0cUA0BRmM5Wc9qIk7UdWWnlOeqr02GJ+UAYYiV9XeA0ZWtYFpEQQjalbyTK5ESdiUeSZXWjIJ5tcCGMaV6MC+RT6PPn51Fjip3gIZTwDjI/8BwcQKex2EnwUp8E8KfajEH0z5M6Me/TQOwx4HmwZ9MxVYhlu8gVmIGIbd//fw5ojkkZ0XT8g0egMML57wUxLtQhDHhU2PP/mLYGrOKaHvyEIYlmmgJ7gtMG591AhdHTbBMOaeQLd0AIxkn+f3wzB85kCY9QYKe13fBLMe2gdGE6PPNR2+AyapTb5dZxl2wA64QqTmiXu7yrlZNKJ44N0fWoQQwGisw83ZHRDIYpBhPdprI2d0o1FR89dOgWmnC2zXfZE1TeWZOYcLQzo0/O3Fd+uYvgyaYx4ejNNVgTTZHzy2iH59i5oBQ7ouleCAfphHtatL1KswjqpWbSR58HRRL5pnGWYwit1yPj95bFsveM8CDJGPxdbj+cBJ5vFzwT4HQ87H1gqfu5aVgr2expmESXFcFZt9dl7JPNWUeT5hhuTWqh0dZVJWleHDmX/CJD/peEviW2VsX/34h8I7jPNln9smbzjlG84rjAvlcSQPni7+w/kHQxpYnd8RxxTPa8YThkKRJZAZOM/L8gOG6n1yvojmsYyqHiyHRNAcTfEKQ0G05rCb7K3lu1tGtvW2n8x4uxhhGI18bpjmCaO/jDIo3GHkWw77afSa0TKi5fCd1d8t478NMmhohdWGlaFdNUz3lXiBdGeZfjwm4Wrt3rJ+9BnZyubesjUlmPBtjJtScCves8QBMs0AI9zR2VumTcd0hvw7yBQXzLRuMKfIeXcYfSoY9K+amXQ+GNbD8AG6YOZ0y8DnuEHcLXMWmFNZ5lww7oKZ1O1ydcF8ypQXzLRSS3keGHsqmEh/ARcOOeT3W9EFAAAAAElFTkSuQmCC';
        setProfilePics(passedPics)
    }
 
    fetchProfilePicture();
  }, [])

  
  useEffect(() => {
    let unsub;

    const fetchChards = async () => {

      const employee = await getDocs(
        collection(db, "employee")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const employer = await getDocs(
        collection(db, "employer")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

     
      const employeeUserIds = employee.length > 0 ? employee : ["test"];
      const employerUserIds = employer.length > 0 ? employer : ["test"]
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      console.log(employeeUserIds)

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds,...employeeUserIds])),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id != user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchChards();
    return unsub;
  }, [db]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists()) {
          console.log(`Hooray you MATCHED with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(
            `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
          );
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: profilePics }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            style={tw`h-13 w-13 m-2`}
            source={require("../assets/IMG_9482.jpg")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#EB7773" />
        </TouchableOpacity>
      </View>

      {/* End of header */}

      {/* Cards */}

      {/* <Text>I am the HomeScreen</Text>
	  <Button title="Go to chat screen" onPress={() => navigation.navigate("Chat") }/>
	  <Button title="Logout" onPress={logout}/> */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH");
            swipeRight(cardIndex);
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "no",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "yes",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={tw`relative bg-white h-3/4 rounded-xl`}
              >
                <Image
                  style={tw`absolute top-0 h-full w-full rounded-xl`}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    tw`absolute bottom-0 bg-white w-full flex-row items-center justify-between
			    h-20 px-6 py-2 rounded-b-xl`,
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw`text-xl font-bold`}>
                      {card.displayName} {card.lastName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw`text-xl font-bold`}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw`relative bg-white h-3/4 rounded-xl justify-center items-center`,
                  styles.cardShadow,
                ]}
              >
                <Text style={tw`font-bold pb-5`}>No more profiles</Text>

                <Image
                  style={tw`h-20 w-full`}
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>

      <View style={tw`flex flex-row justify-evenly`}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw`absolute bottom-4 left-20 items-center justify-center rounded-full w-16 h-16 bg-red-200`}
        >
          <Entypo name="cross" color="red" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw`absolute bottom-4 right-20 items-center justify-center rounded-full w-16 h-16 bg-green-200`}
        >
          <MaterialCommunityIcons name="cash-fast" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
