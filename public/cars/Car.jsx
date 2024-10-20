import React from 'react'
import { useGLTF } from '@react-three/drei'
export default function Model(props) {
  const { nodes, materials } = useGLTF('/car.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.053}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.material} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Aston_Martin_V8_Vantage_V600_1998_by_Alex_Ka} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.Vantage600} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.material_3} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.black_aluminium} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.black_chrome} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.black_matte} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.black_plastic} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.bottom} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.brake_lights} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.brakedisc} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.chrome} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.chrome_details} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.exhaust} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.exhaust_bronze} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.exhaust_hole} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.floor} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.floormat} />
        <mesh geometry={nodes.Object_20.geometry} material={materials.front_grill} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.gabarite_lights} />
        <mesh geometry={nodes.Object_22.geometry} material={materials.grill_front} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.grill_rear} />
        <mesh geometry={nodes.Object_24.geometry} material={materials.grill_side} />
        <mesh geometry={nodes.Object_25.geometry} material={materials.headlight} />
        <mesh geometry={nodes.Object_26.geometry} material={materials.headlight_defrost_lines} />
        <mesh geometry={nodes.Object_27.geometry} material={materials.headlight_glass} />
        <mesh geometry={nodes.Object_28.geometry} material={materials.headlight_plastic1} />
        <mesh geometry={nodes.Object_29.geometry} material={materials.headlight_plastic2} />
        <mesh geometry={nodes.Object_30.geometry} material={materials.hoodemblem} />
        <mesh geometry={nodes.Object_31.geometry} material={materials.interior} />
        <mesh geometry={nodes.Object_32.geometry} material={materials.limited_edition} />
        <mesh geometry={nodes.Object_33.geometry} material={materials.matte_details} />
        <mesh geometry={nodes.Object_34.geometry} material={materials.mirrors} />
        <mesh geometry={nodes.Object_35.geometry} material={materials.plastic_details} />
        <mesh geometry={nodes.Object_36.geometry} material={materials.plate_front} />
        <mesh geometry={nodes.Object_37.geometry} material={materials.plate_lights} />
        <mesh geometry={nodes.Object_38.geometry} material={materials.plate_logo} />
        <mesh geometry={nodes.Object_39.geometry} material={materials.plate_name_need_for_speed} />
        <mesh geometry={nodes.Object_40.geometry} material={materials.plate_rear} />
        <mesh geometry={nodes.Object_41.geometry} material={materials.plate_red_lamps} />
        <mesh geometry={nodes.Object_42.geometry} material={materials.radiator_1} />
        <mesh geometry={nodes.Object_43.geometry} material={materials.radiator_2} />
        <mesh geometry={nodes.Object_44.geometry} material={materials.radiator_3} />
        <mesh geometry={nodes.Object_45.geometry} material={materials.rear_details} />
        <mesh geometry={nodes.Object_46.geometry} material={materials.reverse_light} />
        <mesh geometry={nodes.Object_47.geometry} material={materials.rim1} />
        <mesh geometry={nodes.Object_48.geometry} material={materials.rim2} />
        <mesh geometry={nodes.Object_49.geometry} material={materials.rim_bolt_bronze} />
        <mesh geometry={nodes.Object_50.geometry} material={materials.rim_emblem} />
        <mesh geometry={nodes.Object_51.geometry} material={materials.seatbelt} />
        <mesh geometry={nodes.Object_52.geometry} material={materials.side_emblem} />
        <mesh geometry={nodes.Object_53.geometry} material={materials.stop_light} />
        <mesh geometry={nodes.Object_54.geometry} material={materials.suport} />
        <mesh geometry={nodes.Object_55.geometry} material={materials.suport_bronze_bolt} />
        <mesh geometry={nodes.Object_56.geometry} material={materials.supportlogo} />
        <mesh geometry={nodes.Object_57.geometry} material={materials.tire} />
        <mesh geometry={nodes.Object_58.geometry} material={materials.tire_side} />
        <mesh geometry={nodes.Object_59.geometry} material={materials.turnsignal_front} />
        <mesh geometry={nodes.Object_60.geometry} material={materials.turnsignal_rear} />
        <mesh geometry={nodes.Object_61.geometry} material={materials.turnsignal_side} />
        <mesh geometry={nodes.Object_62.geometry} material={materials.material_60} />
        <mesh geometry={nodes.Object_63.geometry} material={materials.material_61} />
      </group>
    </group>
  )
}

useGLTF.preload('/car.gltf')
