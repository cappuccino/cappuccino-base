/*
 * Objective-J.js
 * Objective-J
 *
 * Created by Francisco Tolmasky.
 * Copyright 2008-2010, 280 North, Inc.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */

function ObjectiveJLoader()
{
    var loader = {};
    var factories = {};
    loader.reload =     function(topId, path)
    {
        if (!global.ObjectiveJ)
            global.ObjectiveJ = require("objective-j");
        factories[topId] = ObjectiveJ.make_narwhal_factory(path);
        factories[topId].path = path;
    };
    loader.load =     function(topId, path)
    {
        if (!factories.hasOwnProperty(topId))
            loader.reload(topId, path);
        return factories[topId];
    };
    return loader;
}
require.loader.loaders.unshift([".j", ObjectiveJLoader()]);
